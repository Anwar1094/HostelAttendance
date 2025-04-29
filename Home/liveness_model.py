# liveness_model.py
import torch
import torch.nn as nn
import torch.nn.functional as F

class LivenessNet(nn.Module):
    def __init__(self):
        super(LivenessNet, self).__init__()
        self.conv1 = nn.Conv2d(3, 16, 3, padding=1)
        self.conv2 = nn.Conv2d(16, 32, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(32 * 56 * 56, 128)
        self.fc2 = nn.Linear(128, 2)  # [live, spoof]

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))  # (16, 112, 112)
        x = self.pool(F.relu(self.conv2(x)))  # (32, 56, 56)
        x = x.view(-1, 32 * 56 * 56)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x
