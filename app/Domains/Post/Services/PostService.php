<?php

namespace App\Domains\Post\Services;

use App\Services\BaseService;
use App\Domains\Post\Models\Post;

/**
 * Class PostService.
 */
class PostService extends BaseService
{
    /**
     * PostService constructor.
     *
     * @param  Post  $post
     */
    public function __construct(Post $post)
    {
        $this->model = $post;
    }
}