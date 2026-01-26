<?php
declare(strict_types=1);
namespace App\Tests;

use App\Entity\General;
use DateTimeImmutable;
use PHPUnit\Framework\TestCase;

class GeneralTest extends TestCase
{

    public function testDiveraUrl(): void
    {
        $item = (new General())
            ->setDiveraUrl("https://test.de");

        $this->assertSame("https://test.de", $item->getDiveraUrl());
    }

    public function testReloadTimeGeneral(): void
    {

        $item = (new General())
            ->setReloadTimeGeneral(1000);

        $this->assertSame(1000, $item->getReloadTimeGeneral());
    }

    public function testReloadTimeAlert(): void
    {

        $item = (new General())
            ->setReloadTimeAlert(1000);

        $this->assertSame(1000, $item->getReloadTimeAlert());
    }

    public function testReloadTimeMessage(): void
    {

        $item = (new General())
            ->setReloadTimeMessage(1000);

        $this->assertSame(1000, $item->getReloadTimeMessage());
    }

    public function testReloadTimeStyle(): void
    {

        $item = (new General())
            ->setReloadTimeStyle(1000);

        $this->assertSame(1000, $item->getReloadTimeStyle());
    }

    public function testIsShowReloadToast(): void
    {

        $item = (new General())
            ->setShowReloadToast(true);

        $this->assertTrue($item->isShowReloadToast());
    }

    public function testComment(): void
    {
        $item = (new General())
            ->setComment("Comment");

        $this->assertSame("Comment", $item->getComment());
    }

    public function testCreatedAt(): void
    {
        $now = new DateTimeImmutable();
        $item = (new General())
            ->setCreatedAt($now);

        $this->assertSame($now, $item->getCreatedAt());
    }

    public function testUpdatedAt(): void
    {
        $now = new DateTimeImmutable();
        $item = (new General())
            ->setUpdatedAt($now);

        $this->assertSame($now, $item->getUpdatedAt());
    }
}
