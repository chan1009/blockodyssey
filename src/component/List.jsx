import React, { useEffect, useState } from "react";
import "./list.css";
import Pagination from "./pagination";

export default function List({ userInput, userOption }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const Column = [
    "상품번호",
    "상품명",
    "브랜드",
    "상품내용",
    "가격",
    "평점",
    "재고",
  ];

  const filterProducts = products.filter((product) => {
    if (userOption === "상품명") {
      return product.title.includes(userInput);
    } else if (userOption === "브랜드") {
      return product.brand.includes(userInput);
    } else if (userOption === "상품내용") {
      return product.description.includes(userInput);
    } else if (userOption === "전체") {
      return (
        product.title.includes(userInput) ||
        product.brand.includes(userInput) ||
        product.description.includes(userInput)
      );
    }
  });

  const getProducts = async () => {
    const json = await (
      await fetch("https://dummyjson.com/products?limit=100")
    ).json();
    setProducts(json.products);
    setLoading(false);
  };
  const shortenWords = (str, length = 42) => {
    let result;
    if (str.length > length) {
      result = str.substr(0, length - 2) + "...";
    } else {
      result = str;
    }
    return result;
  };

  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  useEffect(() => {
    getProducts();
  });
  return (
    <>
      <div className="ListWrapper">
        <div className="HeaderWrapper">
          {Column.map((title) => (
            <div key={title}>{title}</div>
          ))}
        </div>
        <hr />
        <div>
          {loading ? (
            <></>
          ) : (
            <>
              {currentPosts(filterProducts).map((product) => (
                <div className="ProductWrapper">
                  <div className="item">{product.id}</div>
                  <div className="item">{product.title}</div>
                  <div className="item">{product.brand}</div>
                  <div>{shortenWords(product.description)}</div>
                  <div className="item">{product.price}</div>
                  <div className="item">{product.rating}</div>
                  <div className="item">{product.stock}</div>
                </div>
              ))}
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={products.length}
                paginate={setCurrentPage}
                setPost={setPostsPerPage}
              ></Pagination>
            </>
          )}
        </div>
      </div>
    </>
  );
}
