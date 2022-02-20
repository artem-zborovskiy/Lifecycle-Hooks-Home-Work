import React from "react";
import './css/post.css';
import Menu from "./Menu.js";

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(
                (json) => {
                    this.setState({
                        isLoaded: true,
                        items: json
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    
    deletePost = (index) => {
        let arr = this.state.items;
        arr[index].isDeletion = true;
        this.setState({items: arr});
        setTimeout(() => {
            arr.splice(index, 1);
            this.setState({items: arr});
        }, 500);
    }

    changeTitle = (newTitle, index) => {
        let arr = this.state.items;
        arr[index].title = newTitle;
        this.setState({items: arr});
    }

    render() {
        const { error, isLoaded, items} = this.state;

        if(error) {
            return <div>Ошибка: {error.message}</div>;
        } else if(!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return(
                <ul>
                    {items.map((item, index) => (
                        <li key={item.id} className={item.isDeletion ? 'post deletion' : 'post'}>
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                            <div className="post-menu">
                                <button className="delete-btn" onClick={() => {return this.deletePost(index)}}>DELETE</button>
                                <Menu func={this.changeTitle} id={index}/>
                            </div>  
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default Posts;