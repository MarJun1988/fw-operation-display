<?php

namespace App\Repository;

use App\Entity\General;
use App\Service\DataTableService;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Query\QueryException;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

/**
 * @extends ServiceEntityRepository<General>
 *
 * @method General|null find($id, $lockMode = null, $lockVersion = null)
 * @method General|null findOneBy(array $criteria, array $orderBy = null)
 * @method General[]    findAll()
 * @method General[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GeneralRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, General::class);
    }

    /**
     * Find Entries for the Prime VUE DataTable
     * @throws \JsonException
     * @throws QueryException
     * @return General[] Returns an array of General objects
     */
    public function findByDataTableService(Request $requestUri, DataTableService $dataTableService):array
    {
        $uri = urldecode($requestUri->getRequestUri());
        $tableShort = "g";
        $globalFilter = ["reloadTimeAlert", "reloadTimeStyle", "diveraUrl", "reloadTimeGeneral", "reloadTimeMessage", "comment"];

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
