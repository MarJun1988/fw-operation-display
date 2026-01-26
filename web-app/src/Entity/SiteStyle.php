<?php

namespace App\Entity;

use App\Repository\SiteStyleRepository;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\NotBlank;

#[ORM\Entity(repositoryClass: SiteStyleRepository::class)]
#[ORM\Table(name: '`site_styles`')]
#[UniqueEntity(fields: ['name', 'description'])]
class SiteStyle
{
    private const GROUPS = ['list-data-table'];

    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: "CUSTOM")]
    #[ORM\Column(type: "uuid", unique: true)]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[Groups(self::GROUPS)]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[NotBlank, Groups(self::GROUPS)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[NotBlank, Groups(self::GROUPS)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    #[Groups(self::GROUPS)]
    private ?string $style = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(self::GROUPS)]
    private ?string $comment = null;

    #[ORM\Column]
    #[NotBlank, Groups(self::GROUPS)]
    private ?int $sorting = null;

    #[ORM\Column]
    #[Groups(self::GROUPS)]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(self::GROUPS)]
    private ?\DateTimeImmutable $updatedAt = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getStyle(): ?string
    {
        return $this->style;
    }

    public function setStyle(string $style): static
    {
        $this->style = $style;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }

    public function getSorting(): ?int
    {
        return $this->sorting;
    }

    public function setSorting(int $sorting): static
    {
        $this->sorting = $sorting;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }
}
