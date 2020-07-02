tests:

```
    afterAll(() => {
        setTimeout(() => {
            process.kill(pid, 'SIGTERM');
        }, 300);
    });

    // избегаем проблем с запуском сервиса на CI - даем ему время на запуск
    if (process.env.CI) {
        beforeAll(async () => {
            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, 2000),
            );
        });
    }
```

redis subscription

```js
// подписываемся на событие изменения справочников
redis.subscribe('dictionaries').then(() => {
    redis.on('message', (channel, msg) => {
        logger.info('Обновились справочники', channel, msg);
    });
});
```

Docker registry

curl -X GET http://localhost:4000/v2/_catalog
curl -X GET http://localhost:4000/v2/pg-redis/tags/list

-it
ls -a /var/lib/registry/docker/registry/v2/repositories/

-   Copy from docker container to host
    docker cp db:/var/lib/postgresql/data/PG_VERSION PG_VERSION

-   Who is uses a volume

```
    docker ps -a --filter volume=VOLUME_NAME_OR_MOUNT_POINT
```
