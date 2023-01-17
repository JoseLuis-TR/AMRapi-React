function Pagination({postPerPage, totalPosts, paginate}){
    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(totalPosts/postPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav className="contenedorPagination">
            <ul className="pagination-group">
                {
                    pageNumbers.map(number => (
                        <li key={number} className="pagination-item">
                            <a onClick={() => paginate(number)} className="pagination-item-link">
                                {number}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination;