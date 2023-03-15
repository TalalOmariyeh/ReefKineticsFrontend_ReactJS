import React,{Component,Fragment} from 'react';
import axios from "axios";

class RobotRowcopy extends React.Component {
  constructor(props) {
    super(props);
 
    



   // this.handleChange = this.handleChange.bind(this);
   // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState(this.props);
  // }

  

  componentDidMount() {
   
    
  }

  handleSubmit(event,robot) {

    const robotedit={
      RobotId:robot.RobotId,
      RobotName:robot.RobotName,
      UserId:robot.UserId,
      RtypeId:robot.RtypeId
  }
    
    const res =  axios.put('http://localhost:29835/api/tbRobots/PuttbRobot', robotedit)
    event.preventDefault();
  }
 


  add =(e) =>{
    e.preventDefault();
    if (e.target[0].value != "")
    {
      const robotobject={
        
        RobotName:e.target[0].value,
        UserId:e.target[1].value,
        RtypeId:e.target[2].value
    }
   const res =  axios.post('http://localhost:29835/api/tbRobots/PosttbRobot', robotobject)
   console.log(res)

   res.then(data=> {
    var robots = this.state.robots;
    robots.push(data.data);

 

  this.setState({
    robots: robots
  });
   })
    }
    else
    {
      alert("Please fill robot name")
    }
 

  }





handleItemChanged(event,i,robot) {
  var robots = this.state.robots;

  robots[i].UserId = event.target.value;

  this.setState({
    robots: robots
  });
}


static getDerivedStateFromProps(props, state) {
  return props;
}



 

  render() {

    
    
     //const {robots}= this.robots;
      const theRobots = this.state.robots.map((robot,i) =>{
      return(
        <div>
        <span>{robot.RobotName}</span>
        <select value={robot.UserId} onChange={event => this.handleItemChanged(event,i,robot)}> 
          <option value="NULL"> -- Select a Type -- </option>
          {this.props.Users.map((Users,index) => <option key={"val" + index}  value={Users.UserId}>{Users.FullName}</option>)}
        </select>
       
        <span>{robot.userEmail}</span>
        <span>{robot.RTypeName}</span>
        <span>{robot.ModelName}</span>
        <button value={robot} onClick={event => this.handleSubmit(event,robot)} >Save</button>
        </div>
        
      )
    })

  
    return (
    <div className='robotsList'>
     
      <div className="title">
        <span >Robot name</span>
        <span >User full name</span>
        <span >Email</span>
        <span >Type</span>
        <span >Model</span>
      </div>

      {theRobots}
        <hr></hr>

      <form onSubmit={this.add} >
        <div className="input-container">
          <label>Robot Name </label>
          <input type="text"  />
        </div>
        <div className="input-container">
          <label>User Name </label>
          <select key={this.props.Users.UserId}> 
      <option value="NULL"> -- Select a User -- </option>
      {this.props.Users.map((Users) => <option value={Users.UserId}>{Users.FullName}</option>)}
    </select>
        </div>
        <div className="input-container">
          <label>Robot Type </label>
          <select key={this.props.Type.RtypeId}> 
      <option value="NULL"> -- Select a Type -- </option>
      {this.props.Type.map((Type) => <option value={Type.RtypeId}>{Type.RtypeName}</option>)}
    </select>
        </div>
        <div >
        
        <button type="submit" className="button-container-add" >Add Robot</button>
        </div>
      </form>

    </div>
     
      );
  }
}

export default RobotRowcopy;