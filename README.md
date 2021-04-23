### Escuela Colombiana de Ingeniería

### Arquitecturas de Software - ARSW

## Escalamiento en Azure con Maquinas Virtuales, Sacale Sets y Service Plans

### Dependencias

- Cree una cuenta gratuita dentro de Azure. Para hacerlo puede guiarse de esta [documentación](https://azure.microsoft.com/en-us/free/search/?&ef_id=Cj0KCQiA2ITuBRDkARIsAMK9Q7MuvuTqIfK15LWfaM7bLL_QsBbC5XhJJezUbcfx-qAnfPjH568chTMaAkAsEALw_wcB:G:s&OCID=AID2000068_SEM_alOkB9ZE&MarinID=alOkB9ZE_368060503322_%2Bazure_b_c__79187603991_kwd-23159435208&lnkd=Google_Azure_Brand&dclid=CjgKEAiA2ITuBRDchty8lqPlzS4SJAC3x4k1mAxU7XNhWdOSESfffUnMNjLWcAIuikQnj3C4U8xRG_D_BwE). Al hacerlo usted contará con $200 USD para gastar durante 1 mes.

### 📍 Parte 0 - Entendiendo el escenario de calidad

Adjunto a este laboratorio usted podrá encontrar una aplicación totalmente desarrollada que tiene como objetivo calcular el enésimo valor de la secuencia de Fibonnaci.

**Escalabilidad**
Cuando un conjunto de usuarios consulta un enésimo número (superior a 1000000) de la secuencia de Fibonacci de forma concurrente y el sistema se encuentra bajo condiciones normales de operación, todas las peticiones deben ser respondidas y el consumo de CPU del sistema no puede superar el 70%.

### Escalabilidad Serverless (Functions)

1. Cree una Function App tal cual como se muestra en las imagenes.

2. Instale la extensión de **Azure Functions** para Visual Studio Code.

3. Despliegue la Function de Fibonacci a Azure usando Visual Studio Code. La primera vez que lo haga se le va a pedir autenticarse, siga las instrucciones.

4. Dirijase al portal de Azure y pruebe la function.

5. Modifique la colección de POSTMAN con NEWMAN de tal forma que pueda enviar 10 peticiones concurrentes. Verifique los resultados y presente un informe.

6. Cree una nueva Function que resuelva el problema de Fibonacci pero esta vez utilice un enfoque recursivo con memoization. Pruebe la función varias veces, después no haga nada por al menos 5 minutos. Pruebe la función de nuevo con los valores anteriores. ¿Cuál es el comportamiento?.

**🔎 Preguntas**

1. **¿Qué es un Azure Function?**

   Azure Function es un servicio informático serverless que permite al usuario ejecutar código desencadenado por eventos sin tener que aprovisionar o administrar la infraestructura. Al ser un servicio basado en disparadores, ejecuta un script o un fragmento de código en respuesta a una variedad de eventos.

   Azure Functions se puede usar para lograr el desacoplamiento, el alto rendimiento , la reutilización, compartición y escalabilidad. Cuando aumenta la demanda de ejecución, se asignan más recursos automáticamente al servicio y cuando las solicitudes disminuyen, todos los recursos adicionales y las instancias de aplicación se eliminan automáticamente.

2. **¿Qué es serverless?**

   Serverless o "sin servidor", es un modelo de ejecución en el que el proveedor en la nube (AWS, Azure o Google Cloud) es el responsable de ejecutar un fragmento de código mediante la asignación dinámica de los recursos, es decir, los escala automáticamente si crece la demanda y los libera cuando no son utilizados. Solo se cobra por la cantidad de recursos utilizados para ejecutar el código.

   El código generalmente se ejecuta dentro de contenedores stateless que pueden ser activados por una variedad de eventos como solicitudes http, eventos de bases de datos, servicios de cola, cargas de archivos, eventos programados, etc. El código que se envía a la nube para ejecución suele tener la forma de una función, por lo tanto severless en ocasiones se refiere a “Functions as a Service” or “FaaS”.

3. **¿Qué es el runtime y que implica seleccionarlo al momento de crear el Function App?**

   El runtime o tiempo de ejecución es el intervalo de tiempo en el que un programa se ejecuta. En azure esta relacionado con la versión de .NET, Nodejs (desde la versión 3), Python o Java en la que se basa el tiempo de ejecución. En este caso utilizamos el plan de consumo y la versión de runtime 12, lo cual implica que el tiempo de timeout será de 5 minutos y además nuestra memoria se limpiará en este intervalo de tiempo.

4. **¿Por qué es necesario crear un Storage Account de la mano de un Function App?**

   Al crear una aplicación de función, se debe crear o vincular a una cuenta de Azure Storage de uso general que admita Blob, Queue y Table Storage. Esto se debe a que Functions se basa en Azure Storage para operaciones como la administración de desencadenadores y el registro de ejecuciones de funciones.

5. **¿Cuáles son los tipos de planes para un Function App?, ¿En qué se diferencias?, mencione ventajas y desventajas de cada uno de ellos.**

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

6. **¿Por qué la memorización falla o no funciona de forma correcta?**

   La función recursiva con memorización no funciona de forma correcta debido a que usamos el plan de consumo que nos ofrece 1.5 GB por instancia lo que puede quedar corto a la hora de hacer peticiones con números muy grandes y a partir de ahí ocurre un error, ya que el número de llamadas recursivas excede la capacidad del call stack.

7. **¿Cómo funciona el sistema de facturación de las Function App?**

   El plan de consumo de Azure Functions se factura en función del consumo de recursos y las ejecuciones por segundo. Los precios del plan de consumo incluyen una concesión gratuita mensual de 1 millones de solicitudes y 400.000 GB-segundos de consumo de recursos por suscripción en el modelo de precios de pago por uso, para todas las aplicaciones de funciones de esa suscripción. El plan Azure Functions Premium proporciona un rendimiento mejorado y se factura por segundo en función del número de vCPU/s y de GB/s que consuman sus funciones premium. Los clientes también puede ejecutar Functions dentro de su plan de App Service a las tarifas normales del plan de App Service.

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
