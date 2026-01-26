<?php
declare(strict_types=1);
namespace App\DataFixtures;

use App\Entity\SiteStyle;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use JsonException;

class SiteStyleFixtures extends Fixture
{
    /**
     * @throws JsonException
     */
    public function load(ObjectManager $manager): void
    {
        $file = __DIR__ . '/../../assets/database-basic-data/site-style.json';

        if (!file_exists($file)) {
            return;
        }

        $jsonSiteStyle = json_decode(file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);

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

                    $manager->persist($newSiteStyle);
                }
            }

            $manager->flush();
        }
    }
}
