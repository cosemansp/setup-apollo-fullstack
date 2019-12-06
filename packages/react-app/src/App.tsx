import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useGetArtworkQuery, Category } from './graphql/types';

const Home = () => {
  const { data } = useGetArtworkQuery({
    variables: {
      where: { AND: [{ category: Category.Painting }] },
      orderBy: null,
    },
  });
  console.log(data);
  return (
    <Fragment>
      <h2>Home</h2>
    </Fragment>
  );
};

const About = () => {
  return <h2>About</h2>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
