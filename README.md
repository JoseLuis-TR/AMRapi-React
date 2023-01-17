<p align="center">
  <img width="250" height="250" src="https://upload.wikimedia.org/wikipedia/commons/6/61/AniList_logo.svg">
</p>

# :japanese_goblin: AMR - Recomendador de Anime y Manga :japanese_goblin:

Proyecto realizado en la asignatura de Desarrollo web en entorno cliente, utilizando un diseño realizado anteriormente en un trabajo de la asignatura
Diseño de Interfaces Web y añadiendole funcionalidad con una api de nuestra elección

## Api escogida: AniList APIv2

Api con toda la información sobre Anime y Manga perteneciente a la web Anilist

[Enlace a la api](https://anilist.gitbook.io/anilist-apiv2-docs/)

## Iniciar la aplicación en local

Para poder probar la aplicación en nuestro ordenador primero deberemos clonar el respositorio (obvio) y realizar los siguientes comandos:

**1. Instalamos todas las dependencias del proyecto**

``` 
npm install 
```

**2. Instalamos el modulo de sass para evitar problemas**

```
npm install --save-dev sass
```

**3. Iniciamos el proyecto**

```
npm run start
```

Con esto podremos acceder al sitio web desde [localhost:3000](http://localhost:3000/)

## Despliegue del sitio

Para realizar el despliegue de la página web he usado el servicio Netlify, principalmente por los problemas que me generaba el usar github-pages para el despligue ya que presenta varios problemas con los proyectos escritos en React, cosa que no sucede con Netlify.

Puede visitarse el sitio desplegado en [este enlace](https://amr-jltr.netlify.app/).

## Documentación

Se ha usado JSDocs para generar documentación automática del proyecto, el cual puede ser revisado desde el archivo index.html encontrado dentro de la carpeta docs.
