import React, { useState, useEffect, ReactElement } from "react";
import {
  DataGrid,
  GridCellParams,
  GridPageChangeParams,
} from "@material-ui/data-grid";
import Image from "material-ui-image";
import { Beer } from "./types";
import api from "./api";

type Props = {
  beers: Beer[];
  setBeer: (beer: Beer) => void;
  setBeers: (beers: Beer[]) => void;
  limit: number;
};

export default function BeersPage({
  beers,
  setBeer,
  setBeers,
  limit,
}: Props): ReactElement {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (params: GridPageChangeParams) => {
    setPage(params.page);
  };

  useEffect(() => {
    if (page === 0) return;
    (async () => {
      setLoading(true);
      setBeers(await api.getBeers(page, limit));
      setLoading(false);
    })();
  }, [page]);

  return (
    <>
      <DataGrid
        autoHeight={true}
        rows={beers}
        columns={[
          { field: "name", headerName: "Name", width: 200 },
          { field: "tagline", headerName: "Tagline", width: 300 },
          {
            field: "image_url",
            headerName: "Photo",
            width: 100,
            renderCell(params: GridCellParams): ReactElement {
              return (
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    padding: 0,
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                    backgroundColor: "none",
                  }}
                  imageStyle={{
                    width: "auto",
                    position: "static",
                  }}
                  src={params.value as string}
                  onClick={async () => {
                    const beer = params.row as unknown;
                    setBeer(beer as Beer);
                  }}
                />
              );
            },
          },
          { field: "abv", headerName: "ABV", width: 120 },
        ]}
        sortModel={[
          {
            field: "abv",
            sort: "desc",
          },
        ]}
        pagination
        pageSize={limit}
        rowCount={100}
        paginationMode="server"
        onPageChange={handlePageChange}
        loading={loading}
      />
    </>
  );
}
