<?php
declare(strict_types=1);
namespace App\Controller;

use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    #[Route('/', name: 'default-app')]
    public function loginRedirectToRoute(LoggerInterface $logger): RedirectResponse
    {
        $logger->info('Redirect to Web-Anwendung');

        return new RedirectResponse('/display-raspberry-pi');
    }


    #[Route('/{route}', name: 'app-frontend', requirements: ['route' => '^(?!.*_wdt|_profiler|basic|api).+'])]
    public function index(): Response
    {
        // Weiterleitung zur Hauptseite (VUE JS)
        return $this->render('main/index.html.twig');
    }
}
