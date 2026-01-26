<?php
declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\SiteStyle;
use App\Repository\SiteStyleRepository;
use App\Service\CheckEntityService;
use App\Service\DataTableService;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query\QueryException;
use JsonException;
use Psr\Cache\InvalidArgumentException;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

#[Route('/api/site-style', name: 'api_site_style')]
class SiteStyleController extends AbstractController
{
    private const LOGGER_ALL_ENTRIES = "Site Styles";
    private const LOGGER_ONE_ENTRY = "Site Style";

    public function __construct(
        public LoggerInterface        $logger,
        public CheckEntityService     $checkEntity,
        public EntityManagerInterface $entityManager,
        public TranslatorInterface    $translator,
        public SiteStyleRepository    $siteStyleRepository,
        public DataTableService       $dataTableService
    )
    {
    }

    /**
     * Read all Entries from the Database
     *
     * @param SerializerInterface $serializer
     * @param Request $request
     * @return Response
     * @throws JsonException
     * @throws QueryException
     * @throws InvalidArgumentException
     */
    #[Route('s', name: 's', methods: ['GET'])]
    public function readAll(SerializerInterface $serializer, Request $request): Response
    {
        // Ausgabe in der Logdatei
        $this->logger->info("Read all " . self::LOGGER_ALL_ENTRIES . " from the Database!");

        // Cache im Dateisystem
        $cache = new FilesystemAdapter();

        $count = $cache->getItem('stats.site_style_count');
        $count->expiresAfter(1);
        $filterCount = $cache->getItem('stats.site_style_count');
        $filterCount->expiresAfter(1);
        $items = $cache->getItem('stats.site_style_items');
        $items->expiresAfter(1);
        $serialize = $cache->getItem('stats.site_style_serialize');
        $serialize->expiresAfter(1);

        // retrieve the cache item
        if (!$count->isHit() ||
            !$filterCount->isHit() ||
            !$items->isHit() ||
            !$serialize->isHit()) {
            // ... item does not exist in the cache

            // Auslesen aller Einträge
            $itemsDatabase = $this->siteStyleRepository->findByDataTableService($request, $this->dataTableService);
            // Objekte Konvertieren
            $serializeItems = $serializer->serialize(
                $itemsDatabase['items'],
                'json',
                ['groups' => 'list-data-table']
            );

            // assign a value to the item and save it
            $count->set($itemsDatabase['totalCount']);
            $filterCount->set($itemsDatabase['filterCount']);
            $items->set($itemsDatabase['items']);
            $serialize->set($serializeItems);
            $cache->save($count);
            $cache->save($filterCount);
            $cache->save($items);
            $cache->save($serialize);
        }

        return new JsonResponse([
            'totalRecords' => $count->get(),
            'itemsCount' => $filterCount->get(),
            'items' => json_decode($serialize->get(), false, 512, JSON_THROW_ON_ERROR),
            'parameters' => ""
        ]);
    }

    /**
     * Read the Entry with ID from the Database
     *
     * @param SerializerInterface $serializer
     * @param Request $request
     * @return Response
     * @throws JsonException
     */
    #[Route('/get-by-id/{id}', name: '_get_by_id', methods: ['GET'])]
    public function getById(SerializerInterface $serializer, Request $request): Response
    {
        // Ausgabe in der Logdatei
        $this->logger->info("Read the " . self::LOGGER_ONE_ENTRY . " with ID " . $request->get('id') . " from the Database!");

        // Auslesen des Einträges
        $items = $this->siteStyleRepository->find($request->get('id'));
        // Objekte Konvertieren
        $serialize = $serializer->serialize(
            $items,
            'json',
            ['groups' => 'list-data-table']
        );
        // Ausgabe als JSON
        return new JsonResponse(
            ['item' => json_decode($serialize, false, 512, JSON_THROW_ON_ERROR)]
        );
    }

    /**
     * Create a new Entry in the Database
     * @param Request $request
     * @return Response
     */
    #[Route('/new', name: '_new', methods: ['POST'])]
    public function new(Request $request): Response
    {
        // Ausgabe in der Logdatei
        $this->logger->info("Create a new " . self::LOGGER_ONE_ENTRY);
        // Übermittelte Daten
        $requestEntry = $request->toArray();

        // Anlegen eines neuen Eintrages
        $item = (new SiteStyle())
            ->setName((string)$requestEntry['name'])
            ->setDescription((string)$requestEntry['description'])
            ->setStyle((string)$requestEntry['style'])
            ->setSorting((int)$requestEntry['sorting'])
            ->setComment(isset($requestEntry['comment']) ? (string)$requestEntry['comment'] : "")
            ->setCreatedAt(new \DateTimeImmutable());

        // Prüfen von doppelten Einträgen sowie leeren Feldern, ...
        return $this->checkEntity->validation($item);
    }

    /**
     * Update the Entry with ID in the Database
     *
     * @param Request $request
     * @return Response
     */
    #[Route('/edit/{id}', name: '_edit', methods: ['POST'])]
    public function edit(Request $request): Response
    {
        // Ausgabe in der Logdatei
        $this->logger->info("Update the " . self::LOGGER_ONE_ENTRY . " with ID " . $request->get('id'));
        // Suchen des Eintrages in der Datenbank
        $item = $this->siteStyleRepository->find($request->get('id'));
        // Übermittelte Daten
        $requestEntry = $request->toArray();
        // Für die Validation Fehler
        $errors = [];

        if ($item) {
            $item
                ->setName((string)$requestEntry['name'])
                ->setDescription((string)$requestEntry['description'])
                ->setStyle((string)$requestEntry['style'])
                ->setSorting((int)$requestEntry['sorting'])
                ->setComment(isset($requestEntry['comment']) ? (string)$requestEntry['comment'] : "")
                ->setUpdatedAt(new \DateTimeImmutable());

            // Prüfen von doppelten Einträgen sowie leeren Feldern, ...
            return $this->checkEntity->validation($item);
        }

        // Ausgabe der Fehler Meldung, kein Eintrag mit der ID gefunden
        return new JsonResponse([
            'status' => 'error',
            'message' => $this->translator->trans('entityMessage.notFound'),
            'errors' => $errors,
            'item' => null
        ], 409);

    }

    /**
     * Delete the Entry with ID in the Database
     *
     * @param Request $request
     * @return Response
     */
    #[Route('/delete/{id}', name: '_delete', methods: ['POST'])]
    public function delete(Request $request): Response
    {
        // Ausgabe in der Logdatei
        $this->logger->info("Delete the " . self::LOGGER_ONE_ENTRY . " with ID " . $request->get('id'));
        // Suchen des Eintrages in der Datenbank
        $item = $this->siteStyleRepository->find($request->get('id'));
        // Prüfen, ob der Eintrag vorhanden ist, ...
        if ($item) {
            /** @var SiteStyle $item */
            return $this->checkEntity->validationDelete($item);
        }

        // Ausgabe der Fehler Meldung, kein Eintrag mit der ID gefunden
        return new JsonResponse([
            'status' => 'error',
            'message' => $this->translator->trans('entityMessage.notFound'),
            'item' => null
        ], 409);
    }

}
