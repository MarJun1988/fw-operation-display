<?php
declare(strict_types=1);
namespace App\Tests;

use App\Entity\SiteStyle;
use DateTimeImmutable;
use PHPUnit\Framework\TestCase;

class SiteStyleTest extends TestCase
{
    public function testName(): void
    {
        $item = (new SiteStyle())
            ->setName("Name");

        $this->assertSame("Name", $item->getName());
    }

    public function testDescription(): void
    {
        $item = (new SiteStyle())
            ->setDescription("Description");

        $this->assertSame("Description", $item->getDescription());
    }

    public function testSorting(): void
    {
        $item = (new SiteStyle())
            ->setSorting(100);

        $this->assertSame(100, $item->getSorting());
    }

    public function testStyle(): void
    {
        $item = (new SiteStyle())
            ->setStyle("text-align: center;");

        $this->assertSame("text-align: center;", $item->getStyle());
    }

    public function testComment(): void
    {
        $item = (new SiteStyle())
            ->setComment("Comment");

        $this->assertSame("Comment", $item->getComment());
    }

    public function testCreatedAt(): void
    {
        $now = new DateTimeImmutable();
        $item = (new SiteStyle())
            ->setCreatedAt($now);

        $this->assertSame($now, $item->getCreatedAt());
    }

    public function testUpdatedAt(): void
    {
        $now = new DateTimeImmutable();
        $item = (new SiteStyle())
            ->setUpdatedAt($now);

        $this->assertSame($now, $item->getUpdatedAt());
    }
}
