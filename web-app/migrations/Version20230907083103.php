<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230907083103 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE generals ADD created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD comment VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE incoming_alerts ADD updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD comment VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE messages ADD comment VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE site_styles ADD created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `generals` DROP created_at, DROP updated_at, DROP comment');
        $this->addSql('ALTER TABLE `site_styles` DROP created_at, DROP updated_at');
        $this->addSql('ALTER TABLE `incoming_alerts` DROP updated_at, DROP comment');
        $this->addSql('ALTER TABLE `messages` DROP comment');
    }
}
