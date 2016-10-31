defmodule Mbta.PageController do
  use Mbta.Web, :controller
  require HTTPotion

  def index(conn, _params) do
    schedule = Mbta.Schedule.state()
    visitors = Mbta.Visitors.state()
    initial_state = %{
        "visitors" => visitors,
        "schedule" => schedule
    }
    props = %{
      "location" => conn.request_path,
      "initial_state" => initial_state
    }
    result = Mbta.ReactIO.json_call!(%{
      component: "./priv/static/server/js/mbta.js",
      props: props,
    })

    render(conn, "index.html", html: result["html"], props: initial_state)
  end
end
