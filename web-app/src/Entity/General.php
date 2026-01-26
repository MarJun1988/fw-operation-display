<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\GeneralRepository;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\NotBlank;

#[ORM\Entity(repositoryClass: GeneralRepository::class)]
#[ORM\Table(name: '`generals`')]
class General
{
    private const GROUPS = ['list-data-table'];

    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: "CUSTOM")]
    #[ORM\Column(type: "uuid", unique: true)]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[Groups(self::GROUPS)]
    private ?string $id = null;

    #[ORM\Column]
    #[NotBlank, Groups(self::GROUPS)]
    private ?int $reloadTimeAlert = null;

    #[ORM\Column]
    #[NotBlank, Groups(self::GROUPS)]
    private ?int $reloadTimeStyle = null;

    #[ORM\Column(length: 255)]
    #[NotBlank, Groups(self::GROUPS)]
    private ?string $diveraUrl = null;

    #[ORM\Column(length: 255)]
    #[NotBlank, Groups(self::GROUPS)]
    private ?int $reloadTimeGeneral = null;

    #[ORM\Column]
    #[Groups(self::GROUPS)]
    private ?bool $showReloadToast = null;

    #[ORM\Column]
    #[NotBlank, Groups(self::GROUPS)]
    private ?int $reloadTimeMessage = null;

    #[ORM\Column]
    #[Groups(self::GROUPS)]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(self::GROUPS)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(self::GROUPS)]
    private ?string $comment = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getReloadTimeAlert(): ?int
    {
        return $this->reloadTimeAlert;
    }

    public function setReloadTimeAlert(int $reloadTimeAlert): static
    {
        $this->reloadTimeAlert = $reloadTimeAlert;

        return $this;
    }

    public function getReloadTimeStyle(): ?int
    {
        return $this->reloadTimeStyle;
    }

    public function setReloadTimeStyle(int $reloadTimeStyle): static
    {
        $this->reloadTimeStyle = $reloadTimeStyle;

        return $this;
    }

    public function getDiveraUrl(): ?string
    {
        return $this->diveraUrl;
    }

    public function setDiveraUrl(string $diveraUrl): static
    {
        $this->diveraUrl = $diveraUrl;

        return $this;
    }

    public function getReloadTimeGeneral(): ?int
    {
        return $this->reloadTimeGeneral;
    }

    public function setReloadTimeGeneral(int $reloadTimeGeneral): static
    {
        $this->reloadTimeGeneral = $reloadTimeGeneral;

        return $this;
    }

    public function isShowReloadToast(): ?bool
    {
        return $this->showReloadToast;
    }

    public function setShowReloadToast(bool $showReloadToast): static
    {
        $this->showReloadToast = $showReloadToast;

        return $this;
    }

    public function getReloadTimeMessage(): ?int
    {
        return $this->reloadTimeMessage;
    }

    public function setReloadTimeMessage(int $reloadTimeMessage): static
    {
        $this->reloadTimeMessage = $reloadTimeMessage;

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

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }
}
