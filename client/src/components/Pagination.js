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
}

export default Pagination