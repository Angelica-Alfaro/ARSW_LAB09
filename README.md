### Escuela Colombiana de Ingenier铆a

### Arquitecturas de Software - ARSW

## Escalamiento en Azure con Maquinas Virtuales, Sacale Sets y Service Plans

### Dependencias

- Cree una cuenta gratuita dentro de Azure. Para hacerlo puede guiarse de esta [documentaci贸n](https://azure.microsoft.com/en-us/free/search/?&ef_id=Cj0KCQiA2ITuBRDkARIsAMK9Q7MuvuTqIfK15LWfaM7bLL_QsBbC5XhJJezUbcfx-qAnfPjH568chTMaAkAsEALw_wcB:G:s&OCID=AID2000068_SEM_alOkB9ZE&MarinID=alOkB9ZE_368060503322_%2Bazure_b_c__79187603991_kwd-23159435208&lnkd=Google_Azure_Brand&dclid=CjgKEAiA2ITuBRDchty8lqPlzS4SJAC3x4k1mAxU7XNhWdOSESfffUnMNjLWcAIuikQnj3C4U8xRG_D_BwE). Al hacerlo usted contar谩 con $200 USD para gastar durante 1 mes.

### 馃搷 Parte 0 - Entendiendo el escenario de calidad

Adjunto a este laboratorio usted podr谩 encontrar una aplicaci贸n totalmente desarrollada que tiene como objetivo calcular el en茅simo valor de la secuencia de Fibonnaci.

**Escalabilidad**
Cuando un conjunto de usuarios consulta un en茅simo n煤mero (superior a 1000000) de la secuencia de Fibonacci de forma concurrente y el sistema se encuentra bajo condiciones normales de operaci贸n, todas las peticiones deben ser respondidas y el consumo de CPU del sistema no puede superar el 70%.

### Escalabilidad Serverless (Functions)

1. Cree una Function App tal cual como se muestra en las imagenes.

2. Instale la extensi贸n de **Azure Functions** para Visual Studio Code.

3. Despliegue la Function de Fibonacci a Azure usando Visual Studio Code. La primera vez que lo haga se le va a pedir autenticarse, siga las instrucciones.

4. Dirijase al portal de Azure y pruebe la function.

5. Modifique la colecci贸n de POSTMAN con NEWMAN de tal forma que pueda enviar 10 peticiones concurrentes. Verifique los resultados y presente un informe.

6. Cree una nueva Function que resuelva el problema de Fibonacci pero esta vez utilice un enfoque recursivo con memoization. Pruebe la funci贸n varias veces, despu茅s no haga nada por al menos 5 minutos. Pruebe la funci贸n de nuevo con los valores anteriores. 驴Cu谩l es el comportamiento?.

Una vez realizada la funci贸n se prueba con los valores: 0,6,10,100,1000.

**Comportamiento, previo a los 5 min**

<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <img src="https://github.com/Angelica-Alfaro/ARSW_LAB09/blob/main/images/part2/performance_memo_prev5.png" alt="memo5prev" width="800"/>
        <img src="https://github.com/Angelica-Alfaro/ARSW_LAB09/blob/main/images/part2/performance2_memo_prev5.png" alt="memo5prev2" width="800"/>
    </body>
</html>

Los tiempos de respuesta disminuyeron respecto a la implementaci贸n sin memorizaci贸n, sin embargo al ser los primeros c谩lculos se tiene un tiempo de respuesta normal.

**Comportamiento, posterior a los 5 min**

<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <img src="https://github.com/Angelica-Alfaro/ARSW_LAB09/blob/main/images/part2/performance_memo_pos5.png" alt="memo5pos" width="800"/>
        <img src="https://github.com/Angelica-Alfaro/ARSW_LAB09/blob/main/images/part2/performance2_memo_pos5.png" alt="memo5pos" width="800"/>
    </body>
</html>

Los tiempos de respuesta se redujeron, debido a que a trav茅s de la memorizaci贸n se cuenta con c谩lculos previos de hace 5 minutos.

**馃攷 Preguntas**

1. **驴Qu茅 es un Azure Function?**

   Azure Function es un servicio inform谩tico serverless que permite al usuario ejecutar c贸digo desencadenado por eventos sin tener que aprovisionar o administrar la infraestructura. Al ser un servicio basado en disparadores, ejecuta un script o un fragmento de c贸digo en respuesta a una variedad de eventos.

   Azure Functions se puede usar para lograr el desacoplamiento, el alto rendimiento , la reutilizaci贸n, compartici贸n y escalabilidad. Cuando aumenta la demanda de ejecuci贸n, se asignan m谩s recursos autom谩ticamente al servicio y cuando las solicitudes disminuyen, todos los recursos adicionales y las instancias de aplicaci贸n se eliminan autom谩ticamente.

2. **驴Qu茅 es serverless?**

   Serverless o "sin servidor", es un modelo de ejecuci贸n en el que el proveedor en la nube (AWS, Azure o Google Cloud) es el responsable de ejecutar un fragmento de c贸digo mediante la asignaci贸n din谩mica de los recursos, es decir, los escala autom谩ticamente si crece la demanda y los libera cuando no son utilizados. Solo se cobra por la cantidad de recursos utilizados para ejecutar el c贸digo.

   El c贸digo generalmente se ejecuta dentro de contenedores stateless que pueden ser activados por una variedad de eventos como solicitudes http, eventos de bases de datos, servicios de cola, cargas de archivos, eventos programados, etc. El c贸digo que se env铆a a la nube para ejecuci贸n suele tener la forma de una funci贸n, por lo tanto severless en ocasiones se refiere a 鈥淔unctions as a Service鈥? or 鈥淔aaS鈥?.

3. **驴Qu茅 es el runtime y que implica seleccionarlo al momento de crear el Function App?**

   El runtime o tiempo de ejecuci贸n es el intervalo de tiempo en el que un programa se ejecuta. En azure esta relacionado con la versi贸n de .NET, Nodejs (desde la versi贸n 3), Python o Java en la que se basa el tiempo de ejecuci贸n. En este caso utilizamos el plan de consumo y la versi贸n de runtime 12, lo cual implica que el tiempo de timeout ser谩 de 5 minutos y adem谩s nuestra memoria se limpiar谩 en este intervalo de tiempo.

4. **驴Por qu茅 es necesario crear un Storage Account de la mano de un Function App?**

   Al crear una aplicaci贸n de funci贸n, se debe crear o vincular a una cuenta de Azure Storage de uso general que admita Blob, Queue y Table Storage. Esto se debe a que Functions se basa en Azure Storage para operaciones como la administraci贸n de desencadenadores y el registro de ejecuciones de funciones.

5. **驴Cu谩les son los tipos de planes para un Function App?, 驴En qu茅 se diferencias?, mencione ventajas y desventajas de cada uno de ellos.**

   - Plan de consumo
   - Plan Premium
   - Plan dedicado (App Service)

    <!DOCTYPE html>
    <html>
        <head></head>
        <body>
            <img src="https://github.com/Angelica-Alfaro/ARSW_LAB09/blob/main/images/part2/TiposDePlanes.PNG" alt="ER" width="1000"/>
        </body>
    </html>
    
6. **驴Por qu茅 la memorizaci贸n falla o no funciona de forma correcta?**

    <!DOCTYPE html>
    <html>
        <head></head>
        <body>
            <img src="https://github.com/Angelica-Alfaro/ARSW_LAB09/blob/main/images/part2/memoError.png" alt="memo" width="600"/>
        </body>
    </html>

   La funci贸n recursiva con memorizaci贸n no funciona de forma correcta debido a que usamos el plan de consumo que nos ofrece 1.5 GB por instancia lo que puede quedar corto a la hora de hacer peticiones con n煤meros muy grandes y a partir de ah铆 ocurre un error, ya que el n煤mero de llamadas recursivas excede la capacidad del call stack.

7. **驴C贸mo funciona el sistema de facturaci贸n de las Function App?**

   El plan de consumo de Azure Functions se factura en funci贸n del consumo de recursos y las ejecuciones por segundo. Los precios del plan de consumo incluyen una concesi贸n gratuita mensual de 1 millones de solicitudes y 400.000 GB-segundos de consumo de recursos por suscripci贸n en el modelo de precios de pago por uso, para todas las aplicaciones de funciones de esa suscripci贸n. El plan Azure Functions Premium proporciona un rendimiento mejorado y se factura por segundo en funci贸n del n煤mero de vCPU/s y de GB/s que consuman sus funciones premium. Los clientes tambi茅n puede ejecutar Functions dentro de su plan de App Service a las tarifas normales del plan de App Service.

8. **Informe:** [Mostrar informe](https://github.com/Angelica-Alfaro/ARSW_LAB09/blob/main/Informe.pdf)

**Fuentes:**

- https://www.serverless360.com/azure-functions#:~:text=Azure%20Function%20is%20a%20serverless,to%20a%20variety%20of%20events.
- https://www.c-sharpcorner.com/article/what-is-azure-functions/#:~:text=Azure%20functions%20is%20a%20serverless,JavaScript%2C%20TypeScript%2C%20and%20Python.
- https://serverless-stack.com/chapters/es/what-is-serverless.html
- https://docs.microsoft.com/en-us/azure/azure-functions/functions-versions
- https://docs.microsoft.com/en-us/azure/azure-functions/storage-considerations
- https://azure.microsoft.com/es-es/services/functions/#pricing
- https://azure.microsoft.com/es-es/pricing/details/functions/
- https://docs.microsoft.com/en-us/azure/azure-functions/functions-scale
