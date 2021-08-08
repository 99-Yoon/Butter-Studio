import PaginationBoot from "./PaginationBoot";

const Pagination = ({ totalPages, activePage, prevPage, nextPage, paginate }) => {
    const pageWidth = 5
    const section = Math.floor((activePage - 1) / pageWidth)

    let startPage = section * pageWidth + 1
    if (startPage < 1) startPage = 1

    let endPage = startPage + pageWidth - 1
    if (endPage > totalPages) endPage = totalPages

    const pageNumbers = []
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <PaginationBoot>
            <PaginationBoot.First
                disabled={activePage <= 1}
                onClick={() => paginate(1)}
            />
            <PaginationBoot.Prev onClick={prevPage} disabled={activePage <= 1} />
            {pageNumbers.map((number, index) => <PaginationBoot.Item
                key={index}
                active={activePage === number}
                onClick={() => {
                    console.log("number", number);
                    paginate(number);
                }}
            >
                {number}
            </PaginationBoot.Item>
            )}
            <PaginationBoot.Next
                onClick={nextPage}
                disabled={activePage >= totalPages}
            />
            <PaginationBoot.Last
                disabled={activePage >= totalPages}
                onClick={() => paginate(totalPages)}
            />
        </PaginationBoot>
    )

    // return (
    //     <nav className="col-12 col-md-4 offset-md-4 my-2" aria-label="Page navigation">
    //         <ul className="pagination justify-content-center mb-0">
    //             <li className="page-item">
    //                 <a className="page-link" href="#" aria-label="Previous">
    //                     <span aria-hidden="true">&laquo;</span>
    //                 </a>
    //             </li>
    //             <li className="page-item"><a className="page-link" href="#">1</a></li>
    //             <li className="page-item"><a className="page-link" href="#">2</a></li>
    //             <li className="page-item"><a className="page-link" href="#">3</a></li>
    //             <li className="page-item">
    //                 <a className="page-link" href="#" aria-label="Next">
    //                     <span aria-hidden="true">&raquo;</span>
    //                 </a>
    //             </li>
    //         </ul>
    //     </nav>
    // )
}

export default Pagination