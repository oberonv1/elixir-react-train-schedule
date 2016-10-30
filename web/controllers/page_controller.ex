defmodule Mbta.PageController do
  use Mbta.Web, :controller

  def index(conn, _params) do
    visitors = Mbta.Visitors.state()
        initial_state = %{"visitors" => visitors}
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
