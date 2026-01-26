"""
Masking algorithms for deepfake protection.

This module contains various adversarial masking algorithms that can be used
to protect images against deepfake generation.
"""

from .PGD import apply_pgd_masking

__all__ = ['apply_pgd_masking']