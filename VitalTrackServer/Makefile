# Variables
PYTHON_VERSION := 3.9
VENV_DIR := .venv

# Default target
.PHONY: all
all: install lint test

# Install Python dependencies
.PHONY: install
install:
	python$(PYTHON_VERSION) -m venv $(VENV_DIR)
	$(VENV_DIR)/bin/pip install --upgrade pip
	$(VENV_DIR)/bin/pip install flake8==4.0.1 pytest==7.0.1
	if [ -f requirements.txt ]; then \
	  $(VENV_DIR)/bin/pip install -r requirements.txt; \
	fi

# Set environment variables (requires export before running Makefile)
.PHONY: set-env
set-env:
	@echo "Environment variables set!"

# Lint Python code with flake8
.PHONY: lint
lint:
	$(VENV_DIR)/bin/flake8 . --exclude $(VENV_DIR) --count --select=E9,F63,F7,F82 --show-source --statistics
	$(VENV_DIR)/bin/flake8 . --exclude $(VENV_DIR) --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics

# Run Python tests with pytest
.PHONY: test
test:
	export PYTHONPATH=$(pwd):$(pwd)/activity && $(VENV_DIR)/bin/python -m pytest

# Clean up virtual environment and temporary files
.PHONY: clean
clean:
	rm -rf $(VENV_DIR) .pytest_cache __pycache__
