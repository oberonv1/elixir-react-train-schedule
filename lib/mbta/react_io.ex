defmodule Mbta.ReactIO do
  use StdJsonIo, otp_app: :mbta, script: "node_modules/react-stdio/bin/react-stdio"
end