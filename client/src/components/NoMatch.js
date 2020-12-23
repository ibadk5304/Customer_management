
const NoMatch =(props)=>{
    console.log(props)
  return <>
        <h1>No match for {props.location.pathname}</h1>
        <h2>{props.foo}</h2>
      </>
  }

  export default NoMatch; //higher order function/ component