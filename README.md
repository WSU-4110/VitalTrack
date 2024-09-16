# Mental-and-Physical-Health-Management


## VitalTrackServer

### Testing Instructions
Run the following command in your command line:

```pip install -U pytest```

run ```pytest``` in command line


### Formatting
Run the following command in your command line:

```pip install black ```

After that you specify ```black filename.py``` in the terminal and black automatically formats your code. 
If you want to format the whole directory, you can run ```black ./VitalTrackServer``` in the VitalTrack Directory

## MongoDB Connection Setup

To connect to MongoDB for this project, follow these steps:

### 1. Install Required Python Packages

Ensure you have Python installed. Then, install the project dependencies using the `requirements.txt` file:

```bash
pip install -r requirements.txt
```

### Setting Up Environment Variables

1. Copy the `example.env` file to `.env`:

```bash
cp example.env .env

