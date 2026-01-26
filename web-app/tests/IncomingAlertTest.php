<?php
declare(strict_types=1);
namespace App\Tests;

use App\Entity\IncomingAlert;
use DateTimeImmutable;
use PHPUnit\Framework\TestCase;

class IncomingAlertTest extends TestCase
{

    public function testAddress(): void
    {
        $item = (new IncomingAlert())
            ->setAddress("12345678");

        $this->assertSame("12345678", $item->getAddress());
    }

    public function testText(): void
    {
        $item = (new IncomingAlert())
            ->setText("Ein Text");

        $this->assertSame("Ein Text", $item->getText());
    }

    public function testComment(): void
    {
        $item = (new IncomingAlert())
            ->setComment("Comment");

        $this->assertSame("Comment", $item->getComment());
    }

    public function testCreatedAt(): void
    {
        $now = new DateTimeImmutable();
        $item = (new IncomingAlert())
            ->setCreatedAt($now);

        $this->assertSame($now, $item->getCreatedAt());
    }

    public function testUpdatedAt(): void
    {
        $now = new DateTimeImmutable();
        $item = (new IncomingAlert())
            ->setUpdatedAt($now);

        $this->assertSame($now, $item->getUpdatedAt());
    }
}
