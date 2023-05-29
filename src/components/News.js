import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


// let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=17cca6f32ae7458c8bbfd934b2c721f6&pageSize=${this.props.pageSize}`;

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize : 8,
        category : 'general',
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize: PropTypes.number,
        category : PropTypes.string,
    }

    articles = [
        {
        source: { id: "espn-cric-info", name: "ESPN Cric Info" },
        author: null,
        title:
            "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
        description:
            "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
        url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
        urlToImage:
            "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
        publishedAt: "2020-04-27T11:41:47Z",
        content:
            "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
        }
    ];

    capitalize = (string) =>{
        return string.charAt(0).toUpperCase() +  string.slice(1);
    }

    constructor(props) {
        super(props);
        // console.log("Hello i am from news Component !!");
        this.state = {
        articles: [],
        loading: true,
        page : 1,
        totalResults : 0
        };
        document.title= `${this.capitalize(this.props.category)} - NewsMonkey `;
    }

    async updateNews()
    {
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;        

        // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=789f74ab02a94d418b6bb4656581dd3b&page=${this.state.page+1}&pageSize=${this.props.pageSize}`; 

        let data = await fetch(url);
        this.setState({loading : true});
        this.props.setProgress(30);

        let parsedData = await data.json();
        this.props.setProgress(70);

        this.setState({articles : parsedData.articles,totalResults : parsedData.totalResults,
        loading : false});

        this.props.setProgress(100);
    }

    async componentDidMount()
    {
        this.updateNews();
    }

    handlePrevClick= async ()=>{
        console.log("prev");
        this.setState({ page: this.state.page -  1});
        this.updateNews();
    }

    handleNextClick = async ()=>{ 
            this.setState({ page: this.state.page + 1});
            this.updateNews();
    }

    fetchMoreData = async () => {

            console.log(this.props.apiKey);
            // this.setState({page : this.state.page + 1})
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;      
            
            // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=789f74ab02a94d418b6bb4656581dd3b&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;        


            let data = await fetch(url);
            let parsedData = await data.json();
    
            this.setState({
                page : this.state.page + 1,
                articles : this.state.articles.concat(parsedData.articles),
                totalResults : parsedData.totalResults})
        };

    render() {
        console.log("render");
        return (
        <>
            <h4 className="text-center my-3">NewsMonkey Top  .{this.capitalize(this.props.category)} Headlines</h4>
            {this.state.loading && <Spinner />}

            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner/>}
                >

            <div className="container">

            <div className="row">

            {this.state.articles && this.state.articles.map((element) => {
                // console.log(element);
                return (
                    <div className="col-md-3" key={element.url}>
                    <NewsItem
                    title={element.title?element.title.slice(0, 45):""}
                    description={element.description?element.description.slice(0, 88):"Description"}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author = {element.author}
                    date = {element.publishedAt}
                    source = {element.source.name}
                    />
                </div>
                );
            })}

            </div>
            </div>
            </InfiniteScroll>
        </>    
        );
    }
}

export default News;
