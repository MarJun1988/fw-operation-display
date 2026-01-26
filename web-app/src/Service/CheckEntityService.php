<?php
declare(strict_types=1);

namespace App\Service;

use App\Entity\General;
use App\Entity\IncomingAlert;
use App\Entity\Message;
use App\Entity\SiteStyle;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class CheckEntityService
{

    public function __construct(
        public ValidatorInterface     $validator,
        public EntityManagerInterface $entityManager,
        public TranslatorInterface    $translator,
        public SerializerInterface    $serializer
    )
    {
    }

    public function validation(General|IncomingAlert|Message|SiteStyle $entity): Response
    {
        $this->entityManager->persist($entity);
        $result = $this->validator->validate($entity);
        // Für die Validation Fehler
        $errors = [];

        // Gibt es Fehler bei der Validierung?
        if ($result->count() === 0) {
            $this->entityManager->flush();
        } else {
            foreach ($result as $item) {
                $errors[] = [
                    'field' => $item->getPropertyPath(),
                    'message' => $item->getMessage()
                ];
            }
            // Ausgabe der Fehler Meldung
            return new JsonResponse([
                'status' => 'error',
                'message' => $this->translator->trans('entityMessage.failed'),
                'errors' => $errors,
                'item' => null
            ], Response::HTTP_BAD_REQUEST);
        }

        // Ausgabe der Meldung
        return new JsonResponse([
            'status' => 'success',
            'message' => $this->translator->trans('entityMessage.success'),
            'errors' => $errors
        ], Response::HTTP_OK);

    }

    public function validationDelete(General|IncomingAlert|Message|SiteStyle $entity): Response
    {
        $this->entityManager->remove($entity);
        $this->entityManager->flush();

        // Ausgabe der Meldung
        return new JsonResponse([
            'status' => 'success',
            'message' => $this->translator->trans('entityMessage.success'),
            'errors' => []
        ], Response::HTTP_OK);
    }
}
