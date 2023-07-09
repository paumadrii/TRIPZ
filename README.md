# TRIPZ

# PROYECTO FINAL THE BRIDGE

## DEFINICIÓN DEL CLIENTE

Como usuario, al acceder a la aplicación debes logearte o registrarte, en caso de que tengas un usuario creado accederas a la ventana de login, y en caso de que te quieras registrar, accederes a la ventana de register, las cuales estarán en la misma página para mayor comodidad del cliente.

Una vez registrado y logado, la aplicación deberá redirigirme a la página inicial, donde yo como usuario, tendré que introducir todos los campos que se soliciten en el formulario para poder obtener las mejores opciones de viaje.

Una vez que empiece la búsqueda, los datos que he introducido en la primera página, tendrán que estar en la parte superior de la página de resultados, para que el cliente tenga mayor flexibilidad en sus búsquedas.

Tras haber abierto la página de resultados, esta contendrá dos ventanas, en la primera saldrán los vuelos de ida con sus precios, de los cuales el cliente escogerá el que más se ajuste a su criterio, y en la segunda ventana, saldran vuelos de ida.

Cuando el cliente haya hecho las dos selecciones, habrá un boton de "reserva", que llevará al cliente a la página final con la opción de finalizar la reserva y que demuestre los detalles del vuelo, que tendrá un botón que redireccione a la página de reserva de la compañía.

# FUNCIONALIDADES DE CADA PÁGINA.

    ##- Página de inicio:
        Tendrá las dos ventanas, cada una tendrá su formulario para el login o para el register, en caso de que se haga el register primero, los datos del usuario deberan aparecer directamente en los inpust del login, si se hace el login desde cero, el cliente tendra que introducir cada dato.

    ##pagina dos:
    Desglosaré la página por las funcionalidades que debería de tener cada botón.
        ##1. Habrá tres checkbox, que permitan escoger entre vuelos,s y vuelo más hotel. hotele
        ##2. El botón de ida y vuelta deberá ser reversible: Es decir, cuando clique encima de él, se dará la vuelta a la opción ida, o a la opción vuelta.
        ##3. En la opción de personsa tendré que tener un desplegable, con opciones de adultos y niños, y cada opción deberá tener una opción de eliminar y de sumar personas.
        ##4. En la opción desde, hasta, me aparecerá un calendario que me permitirá escoger un intervalo de tiempo, el punto a, deberá introducirse en el recuadro "Desde" y el punto b, en el recuadro "Hasta".
        ##5. Para la opción "Desde donde sales, lo ideal sería que saliese el aeropuerto más cercano a tu ubicación, pero esta es una opción que iremos añadiendo si nos da tiempo. En todo caso, deberá contener un desplegable con los aeropuertos de las ciudades que introduzcas en el buscador. Y para el siguiente botón lo mismo, pero el destino será totalmente flexible y lo tendremos que poner nosotros.
        ##6. El botón de buscar nos redireccionará a la página de resultados.
    ##- Página de resultados:
    Lo ideal es que esta página contenga dos ventanas, pero aparecerá una a la vez. Primero aparecerá la opción de vuelos de ida, de la cual los resultados los obtendremós gracias a que haremos scraping a páginas de diferentes compañías y mostremos los dos resultados más económicos de cada página que scrapeemos.
    La página de resultado deberá tener las opciones de la página dos, pero más pequeño y añadido la opción de crear alertas en nuestro correo, para que nos avise cuando ha bajado el precio de un destino.
    Lo ideal sería añadir filtros de búsuqeda, pero es algo que también dejaré como una opción y si me da tiempo.
    Al extraer cada elemento de la búsqueda tendremos una serie de detalles que mostraremos en cada item. Cada item será seleccionable y se guardará en nuestra base de datos, para poder obtener un resultado final, en el cual se pueda hacer la reserva.
    ##- Página final:
    Mostraremos los items escogidos, y añadido habrá una opción de incluir maleta o no. Finalmente clicaremos la función de reservar, la cual nos tiene que redireccionar a la página de la compañia con las opciones ya seleccionadas y que nos lleve a pagar.
