# Connecting to Google Cloud Instance

To connect to the Google Cloud instance named `llamainstance1` located in the `us-central1-a` zone, you can use the `gcloud` command-line tool. Ensure you have `gcloud` installed and configured on your local machine. 

Follow these steps to connect:

1. Open your terminal.
2. Run the following command:

```sh
gcloud compute ssh llamainstance1 --zone us-central1-a

