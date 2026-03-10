"""
Masking algorithms for deepfake protection.

This module contains various adversarial masking algorithms that can be used
to protect images against deepfake generation.
"""

from .Gauss import apply_gauss

__all__ = ['apply_gauss']