import React from 'react';
import Axios from 'axios';
import Cat from '../common/Cat';
import {Link} from 'react-router-dom';
import {Container, Row, Col } from 'reactstrap';

class CatsIndex extends React.Component{
  state = {
    cats: [],
    users: []
  }

  componentWillMount(){
    Axios
      .get('/api/cats')
      .then(res => this.setState({cats: res.data}/*, ()=> console.log(res.data)*/))
      .catch(err=> console.log(err));
    Axios
      .get('/api/users')
      .then(res => this.setState({users: res.data}/*, ()=> console.log(res.data)*/))
      .catch(err=> console.log(err));
  }

  render(){

    return(

      <Container>
        <h2>Gallery</h2>
        <Row>
          {this.state.cats && this.state.cats.map(cat =>
            <Col xs={12} sm={6} md={4} key={cat.id}>
              <Link to={`/cats/${cat.id}`}><img src={cat.gallery[0].image} alt={cat.type}/></Link>
              <Cat {...cat} index={true}></Cat>
            </Col>
          )}
        </Row>
      </Container>

    );
  }
}
export default CatsIndex;
