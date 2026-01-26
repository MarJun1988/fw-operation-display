<?php

namespace App\Tests;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use GuzzleHttp\RequestOptions;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Ramsey\Uuid\Uuid;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

class ApiGeneralTest extends ApiTestCase
{
    /**
     * @throws TransportExceptionInterface
     * @throws ServerExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws ClientExceptionInterface
     */
    public function testEmptyResult(): void
    {
        $response = static::createClient()->request('GET', '/api/generals');

        $this->assertCount(0, $response->toArray()['items']);
    }

    /**
     * @throws TransportExceptionInterface
     */
    public function testCreateEntry(): void
    {
        static::createClient()->request('POST', '/api/general/new', [

            RequestOptions::JSON => [
                "reloadTimeAlert" => 10000,
                "reloadTimeStyle" => 10000,
                "reloadTimeGeneral" => 10000,
                "reloadTimeMessage" => 10000,
                "showReloadToast" => false,
                "diveraUrl" => "www.example.com"]
        ]);

        self::assertResponseStatusCodeSame(Response::HTTP_OK);
    }

    /**
     * @throws TransportExceptionInterface
     * @throws ServerExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws ClientExceptionInterface
     */
    public function testUpdateEntry(): void
    {
        $response = static::createClient()->request('GET', '/api/generals');

        $item = $response->toArray()['items'][0]["id"];

        static::createClient()->request('POST', "/api/general/edit/$item", [

            RequestOptions::JSON => [
                "reloadTimeAlert" => 10000,
                "reloadTimeStyle" => 10000,
                "reloadTimeGeneral" => 10000,
                "reloadTimeMessage" => 10000,
                "showReloadToast" => true,
                "diveraUrl" => "www.example.com"]
        ]);

        self::assertResponseStatusCodeSame(Response::HTTP_OK);
    }

    /**
     * @throws TransportExceptionInterface
     * @throws ServerExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws ClientExceptionInterface
     */
    public function testDeleteEntry(): void
    {
        $response = static::createClient()->request('GET', '/api/generals');

        $item = $response->toArray()['items'][0]["id"];

        static::createClient()->request('POST', "/api/general/delete/$item");

        self::assertResponseStatusCodeSame(Response::HTTP_OK);
    }

    /**
     * @throws TransportExceptionInterface
     */
    public function testEntryNotFound(): void
    {
       $item = (Uuid::uuid6())->toString();

        static::createClient()->request('POST', "/api/general/delete/$item");

        self::assertResponseStatusCodeSame(Response::HTTP_CONFLICT);
    }
}
