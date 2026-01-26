<?php
declare(strict_types=1);

namespace App\Controller;

use App\Entity\General;
use App\Entity\IncomingAlert;
use App\Entity\SiteStyle;
use App\Repository\GeneralRepository;
use App\Repository\IncomingAlertRepository;
use App\Repository\SiteStyleRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use JsonException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class BasicController extends AbstractController
{
    /**
     * @throws JsonException
     * @throws Exception
     */
    #[Route('/basic', name: 'app_basic')]
    public function index(
        EntityManagerInterface  $entityManager,
        ValidatorInterface      $validator,
        GeneralRepository       $generalRepository,
        SiteStyleRepository     $siteStyleRepository,
        IncomingAlertRepository $incomingAlertRepository
    ): Response {
        $fileSystem = new Filesystem();
        $fileGeneral = "../assets/database-basic-data/general.json";
        $fileSiteStyle = "../assets/database-basic-data/site-style.json";
        $fileIncomingAlert = "../assets/database-basic-data/incoming-alert-lichtenwalde.json";
//        $fileIncomingAlert = "../assets/database-basic-data/incoming-alert-niederwiesa.json";

        // Allgemeines
        if ($fileSystem->exists($fileGeneral) && $generalRepository->count([]) === 0) {
            $jsonGeneral = json_decode(file_get_contents($fileGeneral), true, 512, JSON_THROW_ON_ERROR);

            if (count($jsonGeneral) > 0) {
                foreach ($jsonGeneral as $general) {
                    if (array_keys($general)[0] !== "_comment") {
                        $newGeneral = new General();
                        $newGeneral
                            ->setDiveraUrl((string)$general['diveraUrl'])
                            ->setShowReloadToast((bool)$general['showReloadToast'])
                            ->setReloadTimeGeneral((int)$general['reloadTimeGeneral'])
                            ->setReloadTimeMessage((int)$general['reloadTimeMessage'])
                            ->setReloadTimeAlert((int)$general['reloadTimeAlert'])
                            ->setReloadTimeStyle((int)$general['reloadTimeStyle'])
                            ->setCreatedAt(new DateTimeImmutable());

                        $entityManager->persist($newGeneral);
                        $result = $validator->validate($newGeneral);
                        if (($result = $validator->validate($newGeneral))->count() === 0) {
                            $entityManager->flush();
                        } else {
                            echo $result->count();
                        }
                    }
                }
            }
        }

        // Seiten Aussehen
        if ($fileSystem->exists($fileSiteStyle) && $siteStyleRepository->count([]) === 0) {
            $jsonSiteStyle = json_decode(file_get_contents($fileSiteStyle), true, 512, JSON_THROW_ON_ERROR);

            if (count($jsonSiteStyle) > 0) {
                foreach ($jsonSiteStyle as $siteStyle) {
                    if (array_keys($siteStyle)[0] !== "_comment") {
                        $newSiteStyle = new SiteStyle();
                        $newSiteStyle
                            ->setSorting((int)$siteStyle['sorting'])
                            ->setName((string)$siteStyle['name'])
                            ->setDescription((string)$siteStyle['description'])
                            ->setStyle((string)$siteStyle['style'] ?: " ")
                            ->setComment((string)$siteStyle['comment'])
                            ->setCreatedAt(new DateTimeImmutable());

                        $entityManager->persist($newSiteStyle);
                        $result = $validator->validate($newSiteStyle);
                        if (($result = $validator->validate($newSiteStyle))->count() === 0) {
                            $entityManager->flush();
                        } else {
                            echo $result->count();
                        }
                    }
                }
            }
        }

        // Eingegangen Alarmierungen
        if ($fileSystem->exists($fileIncomingAlert) && $incomingAlertRepository->count([]) === 0) {
            $jsonIncomingAlert = json_decode(file_get_contents($fileIncomingAlert), true, 512, JSON_THROW_ON_ERROR);

            if (count($jsonIncomingAlert) > 0) {
                foreach ($jsonIncomingAlert as $incomingAlert) {
                    if (array_keys($incomingAlert)[0] !== "_comment") {
                        $newIncomingAlert = new IncomingAlert();
                        $newIncomingAlert
                            ->setAddress((string)$incomingAlert['address'])
                            ->setText((string)$incomingAlert['text'])
                            ->setCreatedAt(new DateTimeImmutable((string)$incomingAlert['createdAt']));

                        $entityManager->persist($newIncomingAlert);
                        $result = $validator->validate($newIncomingAlert);
                        if (($result = $validator->validate($newIncomingAlert))->count() === 0) {
                            $entityManager->flush();
                        } else {
                            echo $result->count();
                        }
                    }
                }
            }
        }

        return $this->render('basic/index.html.twig', [
            'controller_name' => 'BasicController',
        ]);
    }
}
