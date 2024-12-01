.PHONY: install test clean

# Install dependencies
install:
	pip install --upgrade pip
	pip install -r requirements.txt

# Run unit tests
test:
	python -m unittest discover -s activity -p "test*.py" -v

# Clean temporary files 
clean:
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete
