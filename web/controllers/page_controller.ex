defmodule Mbta.PageController do
  use Mbta.Web, :controller
  require HTTPotion

  def index(conn, _params) do
    response = HTTPotion.get "http://developer.mbta.com/lib/gtrtfs/Departures.csv"
    visitors = Mbta.Visitors.state()
    initial_state = %{"visitors" => visitors}
    props = %{
      "location" => conn.request_path,
      "initial_state" => initial_state
    }
    IO.inspect response.body
    result = Mbta.ReactIO.json_call!(%{
      component: "./priv/static/server/js/mbta.js",
      props: props,
    })

    render(conn, "index.html", html: result["html"], props: initial_state)
  end
end
