# Jest Mocking Strategies

This project was built to support my blog post [Jest Mocking Strategies](https://www.mercedesbernard.com/blog/jest-mocking-strategies/).

Here are some quick links to the relevant code samples for each use case outlined in the blog post.

1. ES6 Exports

- [Default export of a vanilla function](src/exportExamples/__tests__/defaultFunction.test.js)
- [Named export of a vanilla function](src/exportExamples/__tests__/namedFunction.test.js)
- [Default export of an object](src/exportExamples/__tests__/defaultObject.test.js)
- [Named export of an object](src/exportExamples/__tests__/namedObject.test.js)
- [Default export of a function that returns an object](src/exportExamples/__tests__/defaultFunctionReturnObject.test.js)
- [Named export of a function that returns an object](src/exportExamples/__tests__/namedFunctionReturnObject.test.js)

2. Mock behavior

- Browser functionality
  - [For the whole test suite](src/setupTests.js)
  - [In a single file](src/components/__tests__/Bunny.test.js)
- Node modules
  - [For the whole test suite](src/__mocks__/voca.js)
  - [In a single file](src/helpers/__tests__/dateTimeHelper.test.js)
- A single function of a node module
  - [For the whole test suite](src/setupTests.js)
  - [In a single file](src/components/__tests__/Dog.test.js)
  - [In a single test](src/components/__tests__/DisplayAnimalContainer.test.js)

3. Common mocking errors

- [The module factory of `jest.mock()` is not allowed to reference any out-of-scope variables](src/helpers/__tests__/dateTimeHelper.test.js)
- [Cannot spy the default property because it is not a function](src/helpers/__tests__/dateTimeHelper.test.js)
- [Cannot set property of \#\<Object\> which has only a getter](src/components/__tests__/DisplayAnimalContainer.test.js)
- [Warning: An update inside a test was not wrapped in act](src/components/__tests__/Dog.test.js)

## CRA README

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

#### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

#### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

#### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

#### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

#### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
