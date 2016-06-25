/*
 * Copyright 2012 Aarhus University
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "executableconfiguration.h"

namespace artemis
{

ExecutableConfiguration::ExecutableConfiguration(QSharedPointer<const InputSequence> sequence, const QUrl url)
    : mUrl(url), mSequence(sequence)
{
}

const QUrl ExecutableConfiguration::getUrl() const
{
    return mUrl;
}

bool ExecutableConfiguration::isInitial() const
{
    return mSequence->isEmpty();
}

QSharedPointer<const InputSequence> ExecutableConfiguration::getInputSequence() const
{
    return mSequence;
}

QString ExecutableConfiguration::toString() const
{
    return mSequence->toString();
}

// MODIFIED by CH
QString ExecutableConfiguration::getSequence() const
{
    return mSequence->getSequence();
}

QString ExecutableConfiguration::getLastSequence() const
{
    return mSequence->getLast()->toString();
}

}


