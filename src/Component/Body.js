import React from 'react'

function Body(){
    const program = "algo";
    const predFunc = "predict_t";
    const [text, setText] = React.useState("happy")
    const code = `
    <py-script>
        from ${program} import ${predFunc} 
        pyscript.write("result",${predFunc}("${text}")[0])
    </py-script>`
    const [pys,setPys] = React.useState(code)

    function textHandler(event)
    {
        setText(event.target.value);
        setPys(`
        <py-script>
            from ${program} import ${predFunc} 
            pyscript.write("result",${predFunc}("${text}")[0])
        </py-script>`)
    }
    // function reload(){
    //     setPys(`
    //     <py-script>
    //         from algo import predict_t
    //         pyscript.write("result",predict_t("${text}")[0])
    //     </py-script>`)
    // }
    return (
        <div className = "pg-body">
            <input className = "search-bar" type = "text" placeholder="Enter Text Here ..." defaultValue={""} onChange={textHandler}></input>
            <div className = "res"><label id = "result" defaultValue="joy"></label></div>
            <div dangerouslySetInnerHTML={{__html: pys}} />
            {/* <button className = "find"  onClick = {reload}>Find</button> */}
        </div>
    );
}

export default Body;