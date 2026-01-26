<?php

namespace App\Repository;

use App\Entity\Message;
use App\Service\DataTableService;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Query\QueryException;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

/**
 * @extends ServiceEntityRepository<Message>
 *
 * @method Message|null find($id, $lockMode = null, $lockVersion = null)
 * @method Message|null findOneBy(array $criteria, array $orderBy = null)
 * @method Message[]    findAll()
 * @method Message[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Message::class);
    }

    /**
     * Find Entries for the Prime VUE DataTable
     * @throws \JsonException
     * @throws QueryException
     * @return Message[] Returns an array of General objects
     */
    public function findByDataTableService(Request $requestUri, DataTableService $dataTableService): array
    {
        $uri = urldecode($requestUri->getRequestUri());
        $tableShort = "m";
        $globalFilter = ["headline", "message", "comment"];

        // wurden Parameter mitgegeben?
        if ($uri && str_contains($uri, '?')) {
            $service = $dataTableService;

            $service->explodeParams($uri, $globalFilter);


            // Begrenzung der Ausgabe
            $sql = $this->createQueryBuilder($tableShort)
                ->addCriteria($service->generateFilter());

            // Zusammenfügen der Order By Anweisung
            if (count($service->orderBy) > 0) {
                foreach ($service->orderBy as $order) {
                    $sql->addCriteria($order);
                }
            }

            $filterItems = $sql
                ->setFirstResult($service->offset)
                ->setMaxResults($service->limit)
                ->getQuery()
                ->getResult();

            // Ohne Begrenzung (für die Paginate)
            $maxItems = $this->createQueryBuilder($tableShort)
                ->addCriteria($service->generateFilter())
                ->getQuery()
                ->getResult();

            return [
                "items" => $filterItems,
                "filterCount" => count($filterItems),
                "totalCount" => count($maxItems)
            ];
        }

        // Ohne Filter und Begrenzung
        $allItems = $this->createQueryBuilder($tableShort)
            ->orderBy("$tableShort.createdAt", Criteria::DESC)
            ->getQuery()
            ->getResult();

        return [
            "items" => $allItems,
            "filterCount" => count($allItems),
            "totalCount" => count($allItems)
        ];
    }
}
