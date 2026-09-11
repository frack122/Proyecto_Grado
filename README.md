# Gestionar el registro de npm

Puede configurar npm para publicar paquetes en GitHub Packages y usar los paquetes almacenados en GitHub Packages como dependencias en un proyecto de npm.

<!-- 2148AF7B-5FF8-4B28-A808-D692FEE2225A -->

## Autenticación en GitHub Packages

> \[!NOTE]
> GitHub Packages solo admite la autenticación usando un personal access token (classic). Para más información, consulta [Administración de tokens de acceso personal](/es/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

Necesitas un token de acceso para publicar, instalar y eliminar paquetes privados, internos y públicos.

Puedes utilizar un personal access token (classic) para autenticarte en el GitHub Packages o en la API de GitHub. Cuando creas un personal access token (classic), puedes asignar al token diferentes ámbitos en función de tus necesidades. Para más información sobre los ámbitos relacionados con paquetes para un personal access token (classic), consulta [Acerca de los permisos para los Paquetes de GitHub](/es/packages/learn-github-packages/about-permissions-for-github-packages#about-scopes-and-permissions-for-package-registries).

Para autenticarte en un registro del GitHub Packages dentro de un flujo de trabajo de GitHub Actions, puedes utilizar:

* `GITHUB_TOKEN` para publicar los paquetes asociados con el repositorio del flujo de trabajo.
* Un personal access token (classic) con al menos alcance `read:packages` para instalar los paquetes asociados con otros repositorios privados (`GITHUB_TOKEN` puede utilizarse si el repositorio tiene acceso de lectura al paquete. Consulta [Configurar la visibilidad y el control de accesos de un paquete](/es/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility)).

### Autenticación en un GitHub Actions flujo de trabajo

Este registro admite permisos granulares. En los registros que admiten permisos granulares, si tu flujo de trabajo GitHub Actions usa un personal access token para autenticarse en un registro, te recomendamos encarecidamente que actualices tu flujo de trabajo para usar `GITHUB_TOKEN`. Para obtener instrucciones sobre cómo actualizar los flujos de trabajo que se autentican en un registro con personal access token, consulte [Publicar e instalar un paquete con Acciones de GitHub](/es/packages/managing-github-packages-using-github-actions-workflows/publishing-and-installing-a-package-with-github-actions#upgrading-a-workflow-that-accesses-a-registry-using-a-personal-access-token).

> \[!NOTE]
> La capacidad de que los flujos de trabajo de GitHub Actions eliminen y restauren paquetes mediante la API de REST se encuentra actualmente en versión preliminar pública y está sujeta a cambios.

Puede usar un `GITHUB_TOKEN` en un flujo de trabajo de GitHub Actions para eliminar o restaurar un paquete mediante la API de REST, si el token tiene permiso de `admin` para el paquete. A los repositorios que publican paquetes mediante un flujo de trabajo y a los repositorios que se han conectado explícitamente a los paquetes se les concede automáticamente el permiso `admin` para los paquetes del repositorio.

Para obtener más información sobre `GITHUB_TOKEN`, consulta [Uso de GITHUB\_TOKEN para la autenticación en flujos de trabajo](/es/actions/tutorials/authenticate-with-github_token#using-the-github_token-in-a-workflow). Para obtener más información sobre los procedimientos recomendados al usar un registro en acciones, consulta [Ejecutores en peligro](/es/actions/concepts/security/compromised-runners#cross-repository-access).

También puede optar por conceder permisos de acceso a los paquetes de forma independiente paraGitHub Codespaces yGitHub Actions . Para más información, consulta [Configurar la visibilidad y el control de accesos de un paquete](/es/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility#ensuring-github-codespaces-access-to-your-package) y [Configurar la visibilidad y el control de accesos de un paquete](/es/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility#ensuring-workflow-access-to-your-package).

### Autenticación con personal access token

Debes utilizar un personal access token (classic) con los ámbitos adecuados para publicar e instalar paquetes en GitHub Packages. Para más información, consulta [Introducción a los paquetes de GitHub](/es/packages/learn-github-packages/introduction-to-github-packages#authenticating-to-github-packages).

Puede autenticarse en GitHub Packages con npm editando su archivo `~/.npmrc` de usuario para incluir su personal access token (classic) o iniciando sesión en npm en la línea de comandos con su nombre de usuario y personal access token.

Para autenticarse añadiendo su personal access token (classic) al archivo `~/.npmrc`, edite el archivo `~/.npmrc` de su proyecto para incluir la siguiente línea, sustituyendo TOKEN por su personal access token. Crea un nuevo archivo `~/.npmrc` si no existe.

```shell
//npm.pkg.github.com/:_authToken=TOKEN
```

Para autenticarse iniciando sesión en npm, use el `npm login` comando , reemplazando USERNAME por su GitHub nombre de usuario, TOKEN por personal access token (classic)su y PUBLIC-EMAIL-ADDRESS por su dirección de correo electrónico.

Si usas la versión 9 o una posterior de la CLI de npm e inicias sesión en un registro privado mediante la línea de comandos, o cierras la sesión en él, debes usar la opción `--auth-type=legacy` para leer los detalles de autenticación de mensajes en lugar de usar el flujo de inicio de sesión predeterminado mediante un explorador. Para obtener más información, vea [`npm-login`](https://docs.npmjs.com/cli/v10/commands/npm-login).

Si GitHub Packages no es tu registro de paquetes predeterminado para usar npm y quieres usar el comando `npm audit`, te recomendamos que uses el indicador `--scope` con el espacio de nombres que aloja el paquete (la cuenta personal u organización a la que pertenece el paquete) cuando te autentiques en GitHub Packages.

```shell
$ npm login --scope=@NAMESPACE --auth-type=legacy --registry=https://npm.pkg.github.com

> Username: USERNAME
> Password: TOKEN
```

## Publicación de un paquete

> \[!NOTE]

> * Los nombres y ámbitos de los paquetes solo deben usar letras minúsculas.
> * El tarball de una versión de npm debe tener un tamaño inferior a 256 MB.

El GitHub Packages registro almacena paquetes npm dentro de su organización o cuenta personal, y le permite asociar un paquete a un repositorio. Puedes elegir si quieres heredar permisos desde un repositorio o si quieres configurar permisos granulares independientemente de un repositorio.

Cuando publicas un paquete por primera vez, la visibilidad predeterminada es privada. Para cambiar la visibilidad o establecer permisos de acceso, consulta [Configurar la visibilidad y el control de accesos de un paquete](/es/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility). Para obtener más información sobre cómo vincular un paquete publicado con un repositorio, consulte [Conectar un repositorio a un paquete](/es/packages/learn-github-packages/connecting-a-repository-to-a-package).

Puede conectar un paquete a un repositorio tan pronto como el paquete se publique mediante la inclusión de un campo `repository` en el archivo `package.json`. También puede usar este método para conectar varios paquetes al mismo repositorio. Para más información, consulta [Publicación de varios paquetes en el mismo repositorio](#publishing-multiple-packages-to-the-same-repository).

> \[!NOTE]
> Si publicas un paquete vinculado a un repositorio, el paquete hereda automáticamente los permisos de acceso del repositorio vinculado y los flujos de trabajo de GitHub Actions en el repositorio vinculado automáticamente obtienen acceso al paquete, a menos que la organización haya deshabilitado la herencia automática de los permisos de acceso. Para más información, consulta [Configurar la visibilidad y el control de accesos de un paquete](/es/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility#about-inheritance-of-access-permissions).

Puede configurar la asignación de ámbito del proyecto si usa un archivo `.npmrc` local en el proyecto o la opción `publishConfig` en `package.json`.
GitHub Packages solo admite paquetes npm con ámbito. Los paquetes con ámbito tienen nombres con el formato `@NAMESPACE/PACKAGE-NAME`. Los paquetes con ámbito siempre comienzan con un símbolo `@`. Es posible que tenga que actualizar el nombre en `package.json` para usar el nombre con ámbito. Por ejemplo, si eres el usuario `octocat` y el paquete se llama `test`, asignarías el nombre del paquete con alcance de la siguiente manera: `"name": "@octocat/test"`.

Después de que publiques un paquete, puedes verlo en GitHub. Para más información, consulta [Visualizar paquetes](/es/packages/learn-github-packages/viewing-packages).

### Publicación de un paquete mediante un archivo `.npmrc` local

Puede usar un archivo `.npmrc` para configurar la asignación de ámbito del proyecto. En el archivo `.npmrc`, use la URL y el propietario de la cuenta de GitHub Packages para que GitHub Packages sepa adónde dirigir las solicitudes de paquetes. El uso de un `.npmrc` archivo impide que otros desarrolladores publiquen accidentalmente el paquete en npmjs.org en lugar de GitHub Packages.

1. Autentícate en GitHub Packages. Para obtener más información, consulta [Autenticación en GitHub Packages](#authenticating-to-github-packages).

2. En el mismo directorio que el archivo `package.json`, crea o edita un archivo `.npmrc` para incluir una línea que especifique la URL de GitHub Packages y el espacio de nombres donde se hospeda el paquete. Reemplaza `NAMESPACE` por el nombre de la cuenta de usuario u organización a la que se limitará el paquete.

   ```shell
   @NAMESPACE:registry=https://npm.pkg.github.com
   ```

3. Agregue el archivo *.npmrc* al repositorio donde GitHub Packages pueda encontrar el proyecto. Para más información, consulta [Agregar un archivo a un repositorio](/es/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

4. Compruebe el nombre del paquete en el archivo `package.json` del proyecto. El campo `name` debe contener el ámbito y el nombre del paquete. Por ejemplo, si su paquete se llama "test" y va a publicarlo en la organización "My-org" GitHub, el campo `name` de su `package.json` debe ser `@my-org/test`.

5. Comprueba el campo `repository` en `package.json` del proyecto. El campo `repository` debe coincidir con la URL del repositorio GitHub. Por ejemplo, si la URL del repositorio es `github.com/my-org/test`, el campo del repositorio debe ser `https://github.com/my-org/test.git`.

6. Publique el paquete:

   ```shell
   npm publish
   ```

### Publicación de un paquete mediante `publishConfig` en el archivo `package.json`

Puede usar el elemento `publishConfig` en el archivo `package.json` para especificar el registro donde quiere publicar el paquete. Para más información, consulta [publishConfig](https://docs.npmjs.com/files/package.json#publishconfig) en la documentación de npm.

1. Edite el archivo `package.json` del paquete e incluya una entrada `publishConfig`.

   ```shell
   "publishConfig": {
     "registry": "https://npm.pkg.github.com"
   },
   ```

2. Comprueba el campo `repository` en `package.json` del proyecto. El campo `repository` debe coincidir con la URL del repositorio GitHub. Por ejemplo, si la URL del repositorio es `github.com/my-org/test`, el campo del repositorio debe ser `https://github.com/my-org/test.git`.

3. Publique el paquete:

   ```shell
   npm publish
   ```

## Publicar múltiples paquetes en el mismo repositorio

Para publicar varios paquetes y vincularlos al mismo repositorio, puede incluir la dirección URL del GitHub repositorio en el `repository` campo del `package.json` archivo para cada paquete. Para más información, consulta [Creación de un archivo package.json](https://docs.npmjs.com/creating-a-package-json-file) y [Creación de módulos de Node.js](https://docs.npmjs.com/creating-node-js-modules) en la documentación de npm.

Para asegurarse de que la dirección URL del repositorio es correcta, reemplace por `REPOSITORY` el nombre del repositorio que contiene el paquete que desea publicar y `OWNER` por el nombre de la cuenta personal u organización en GitHub ese repositorio.

GitHub Packages coincidirá con el repositorio en función de la dirección URL del paquete.

```shell
"repository":"https://github.com/OWNER/REPOSITORY",
```

## Instalación de un paquete

Puede instalar paquetes desde GitHub Packages agregando los paquetes como dependencias en el `package.json` archivo del proyecto. Para más información sobre el uso de `package.json` en el proyecto, consulta [Trabajo con package.json](https://docs.npmjs.com/getting-started/using-a-package.json) en la documentación de npm.

Por defecto, puedes agregar paquetes de una organización. Para más información, consulta [Instalación de paquetes de otras organizaciones](#installing-packages-from-other-organizations).

También debe agregar el `.npmrc` archivo al proyecto para que todas las solicitudes para instalar paquetes vayan a través de GitHub Packages. Cuando enruta todas las solicitudes de paquetes a través de GitHub Packages, puede usar paquetes con y sin ámbito de *npmjs.org*. Para obtener más información, consulte [npm-scope](https://docs.npmjs.com/misc/scope) en la documentación de npm.

1. Autentícate en GitHub Packages. Para obtener más información, consulta [Autenticación en GitHub Packages](#authenticating-to-github-packages).

2. En el mismo directorio que el archivo `package.json`, crea o edita un archivo `.npmrc` para incluir una línea que especifique la URL de GitHub Packages y el espacio de nombres donde se hospeda el paquete. Reemplaza `NAMESPACE` por el nombre de la cuenta de usuario u organización a la que se limitará el paquete.

   ```shell
   @NAMESPACE:registry=https://npm.pkg.github.com
   ```

3. Agregue el archivo *.npmrc* al repositorio donde GitHub Packages pueda encontrar el proyecto. Para más información, consulta [Agregar un archivo a un repositorio](/es/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

4. Configura `package.json` en tu proyecto para utilizar el paquete que estás instalando. Para agregar las dependencias del paquete al `package.json` archivo para GitHub Packages, especifique el nombre del paquete de ámbito completo, como `@my-org/server`. Para los paquetes de *npmjs.com*, especifique el nombre completo, como `@babel/core` o `lodash`. Reemplaza `ORGANIZATION_NAME/PACKAGE_NAME` con la dependencia del paquete.

   ```json
   {
     "name": "@my-org/server",
     "version": "1.0.0",
     "description": "Server app that uses the ORGANIZATION_NAME/PACKAGE_NAME package",
     "main": "index.js",
     "author": "",
     "license": "MIT",
     "dependencies": {
       "ORGANIZATION_NAME/PACKAGE_NAME": "1.0.0"
     }
   }
   ```

5. Instala el paquete.

   ```shell
   npm install
   ```

### Instalar paquetes de otras organizaciones

De forma predeterminada, solo puede usar GitHub Packages paquetes de una organización. Si desea enrutar solicitudes de paquete a varias organizaciones y usuarios, puede agregar líneas adicionales al `.npmrc` archivo, reemplazando por `NAMESPACE` por el nombre de la cuenta personal u organización a la que el paquete tiene el ámbito.

```shell
@NAMESPACE:registry=https://npm.pkg.github.com
@NAMESPACE:registry=https://npm.pkg.github.com
```
