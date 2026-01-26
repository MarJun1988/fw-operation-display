<?php

namespace App\Tests;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use GuzzleHttp\RequestOptions;
use Ramsey\Uuid\Uuid;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

class ApiSiteStyleTest extends ApiTestCase
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
        $response = static::createClient()->request('GET', '/api/site-styles');

        $this->assertCount(0, $response->toArray()['items']);
    }

    /**
     * @throws TransportExceptionInterface
     */
    public function testCreateEntry(): void
    {
        static::createClient()->request('POST', '/api/site-style/new', [

            RequestOptions::JSON => [
                "name" => "Default Background",
                "description" => "Background Color of the Display",
                "style" => "background-color: black;",
                "sorting" => 1
            ]
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
        $response = static::createClient()->request('GET', '/api/site-styles');

        $item = $response->toArray()['items'][0]["id"];

        static::createClient()->request('POST', "/api/site-style/edit/$item", [

            RequestOptions::JSON => [
                "name" => "Default Background",
                "description" => "Background Color of the Display Changes",
                "style" => "background-color: black;",
                "sorting" => 1
            ]
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
        $response = static::createClient()->request('GET', '/api/site-styles');

        $item = $response->toArray()['items'][0]["id"];

        static::createClient()->request('POST', "/api/site-style/delete/$item");

        self::assertResponseStatusCodeSame(Response::HTTP_OK);
    }

    /**
     * @throws TransportExceptionInterface
     */
    public function testEntryNotFound(): void
    {
        $item = (Uuid::uuid6())->toString();

        static::createClient()->request('POST', "/api/site-style/delete/$item");

        self::assertResponseStatusCodeSame(Response::HTTP_CONFLICT);
    }
}
