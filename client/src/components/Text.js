const Text = () => {
    return(
        <div>
            <h1 className="text-center display-1"> Text that stands out</h1>
            <div className="container">
                <hr />
                <h2 className="text-center">Space rambles for the funsies</h2>
                <hr />
                {/* row 1 of stuff */}
                <div className="row">
                    <div className="col-md bg-primary">
                        Did you know there's actually a real equation given to the estimate number of active communicative extraterrestrial cvivilizations in the Milky Way Galaxy? This is called the Drake Equation. It really doesn't mean anything in terms of scientific validity, but I thought it was cool that such an equation exists.
                    </div>
                    <div className="col-md bg-success">
                        It's quite odd that planet Earth is still the only source of life in the universe as far as human beings have explored it. You'd think that we would've found something else by now. That raises the question of whether or not we truly are special and one of a kind, or if our technoloy is still too primitive to begin the search for life to begin with.
                    </div>
                    <div className="col-md bg-info">
                        If anything, the lack of life in the universe should raise awareness that Earth is still our only home for the time being. Yet, human beings seem to do everthing in their power to destory it. Earth is the only home we will probbaly ever have in our lifetimes. We need to make sure we love and cherish it while we still have it.
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Text;