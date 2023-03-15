import React, { useEffect, Component } from "react";
import RobotRowcopy from './robot-rowcopy';
import axios from "axios";


import ReactDOM from "react-dom";

class RobotList extends Component{
    state={
        robot:[],
        Users:[],
        Type:[]
    }

    
componentDidMount() {

  
    

    axios.get("http://localhost:29835/api/tbRobots/GettbRobots")
          .then(res =>{
            this.setState({
                robot:res.data
            })
          })



          axios.get("http://localhost:29835/api/tbRobots/GettbUser")
              .then(res =>{
                this.setState({
                    Users:res.data
                })
              })

              axios.get("http://localhost:29835/api/tbRobots/GetRobotType")
              .then(res =>{
                this.setState({
                    Type:res.data
                })
              })
            

}
    
render(){



    
    return (
    <div >
       
      <RobotRowcopy robots={this.state.robot} Users={this.state.Users} Type={this.state.Type} />
      
    </div>
                

    )         
        
    }
}

 

export default RobotList;