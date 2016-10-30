defmodule Mbta.PageController do
  use Mbta.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
