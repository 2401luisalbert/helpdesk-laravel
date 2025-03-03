<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Str; // Asegúrate de importar Str
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = Str::of(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $user ? array_merge($user->toArray(), [
                    'roles' => $user->getRoleNames()->toArray(),
                ]) : null,
            ],
            'flash' => [ // Agrega esta línea para los mensajes flash
                'success' => session('success'),
                'error' => session('error'),
                'info' => session('info'),
                'warning' => session('warning'),
            ],
        ];
    }
}