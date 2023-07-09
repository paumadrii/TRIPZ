DEFINICION TECNICA

Backend

Para la primera pagina tendremos dos rutas:
/auth/signup
/auth/signin

ninguna de las rutas estara protegida, ya que es el primer contacto del cliente con la app.

/auth/signup: Esta ruta es la que nos guardara la informacion del nuevo cliente en nuestra tabla "users" que tendra los siguientes campos:

- id (uuid v4, PK)
- username (text, not null)
- email (text, unique, not null)
- password (text)
  crearemos un endpoint POST/singup que nos devolvera
  {
  "success": true,

}

/auth/signin: Esta ruta se encargara de comparar el usuario itroducido con los datos que tenemos en nuestra tabla mediante una funcion fieldsvalidator, para ellos
crearemos un endpoint POST/auth/Login que nos redigira a la pagina principal de nuestra aplicacion:
la llamada quedara de la siguiente forma:
{
"success": true,
"message": "USER FOUND"
}
contamos con que esta ruta llevara autentificacion.

Pagina dos:
Nuestro endpoint sera GET/search/find, esta ruta nos llevara al controlador en el cual estaran nuestras funciones con la libreria PUPPETERR.
Una vez empiece a funcionar esta libreria ira a nuestras dos paginas de referencia., una vez tengamos la pagina utilizaremos cheerio para obtener la url y poder introducir los parametros de busqueda, cunando la pagina realice la busqueda nos saldran las listas de los vuelos de cada pagina,
escogeremos las tres opciones con precios mas bajos.
obtenidos las 6 opciones, el cliente escogera una.
la opcion escogida es la que guardaremos en nuestra tabla results.

www.Ryanair.es
www.iberia.es
si nos da tiempo anadiremos una ruta mas para escrapear vuelos de google travel.

Una vez tengamos todos los resultados los guarderemos en otra tabla llamada "results", esta tabla tendra los mismos campos que la de "search", pero anadiremos otros campos como:

- id (uuid v4, PK)
- type (text, not null), escogeremos vuelo
- round trip multivalueble field
- passengers
- date deperture
- date arrive
- origin
- destination
- class
- price
- bag
