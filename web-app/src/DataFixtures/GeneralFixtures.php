<?php
declare(strict_types=1);
namespace App\DataFixtures;

use App\Entity\General;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use JsonException;

class GeneralFixtures extends Fixture
{
    /**
     * @throws JsonException
     */
    public function load(ObjectManager $manager): void
    {
        $file = __DIR__ . '/../../assets/database-basic-data/general.json';
        if (!file_exists($file)) {
            return;
        }

        $jsonGeneral = json_decode(file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);

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

                    $manager->persist($newGeneral);
                }
            }

            $manager->flush();
        }
    }
}
