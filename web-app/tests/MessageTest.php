<?php
declare(strict_types=1);
namespace App\Tests;

use App\Entity\Message;
use DateTimeImmutable;
use PHPUnit\Framework\TestCase;

class MessageTest extends TestCase
{
    public function testHeadline(): void
    {
        $item = (new Message())
            ->setHeadline("Headline");

        $this->assertSame("Headline", $item->getHeadline());
    }

    public function testMessage(): void
    {
        $item = (new Message())
            ->setMessage("Message Text");

        $this->assertSame("Message Text", $item->getMessage());
    }

    public function testComment(): void
    {
        $item = (new Message())
            ->setComment("Comment");

        $this->assertSame("Comment", $item->getComment());
    }

    public function testCreatedAt(): void
    {
        $now = new DateTimeImmutable();
        $item = (new Message())
            ->setCreatedAt($now);

        $this->assertSame($now, $item->getCreatedAt());
    }

    public function testUpdatedAt(): void
    {
        $now = new DateTimeImmutable();
        $item = (new Message())
            ->setUpdatedAt($now);

        $this->assertSame($now, $item->getUpdatedAt());
    }
}
